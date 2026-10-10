import SwiftUI
import WidgetKit

// MARK: - Shared model + App Group reader

/// One row of the session overview the app writes to the shared App Group.
/// Mirrors MobileWidgetSession in packages/ui/src/apps/mobileWidgetSnapshot.ts.
struct WidgetSession: Codable, Identifiable, Hashable {
    let id: String
    let title: String
    let unread: Bool
    /// Project label for the session's directory. Optional so snapshots written before this
    /// field existed still decode.
    var project: String?
}

/// The session overview snapshot. Mirrors MobileWidgetSnapshot (same field names) so the
/// JSON the app stores decodes directly.
struct WidgetSnapshot: Codable {
    var runtimeKey: String?
    let attentionCount: Int
    let recentSessions: [WidgetSession]

    static let empty = WidgetSnapshot(runtimeKey: nil, attentionCount: 0, recentSessions: [])
}

enum WidgetStore {
    static let appGroup = "group.com.magio.app"
    static let snapshotKey = "widgetSnapshot"

    /// Reads the latest snapshot the app persisted. Returns `.empty` when nothing has been
    /// written yet (fresh install / app never foregrounded) so widgets render a clean state.
    static func load() -> WidgetSnapshot {
        guard let defaults = UserDefaults(suiteName: appGroup),
              let json = defaults.string(forKey: snapshotKey),
              let data = json.data(using: .utf8),
              let snapshot = try? JSONDecoder().decode(WidgetSnapshot.self, from: data) else {
            return .empty
        }
        return snapshot
    }
}

// MARK: - Deep links (mirror packages/ui/src/apps/deepLinks.ts)

enum WidgetDeepLink {
    static func newSession() -> URL { URL(string: "magio://new")! }
    static func attention() -> URL { URL(string: "magio://sessions?filter=attention")! }
    static func status() -> URL { URL(string: "magio://status")! }
    static func settings() -> URL { URL(string: "magio://settings")! }
    static func changes() -> URL { URL(string: "magio://changes")! }
    static func files() -> URL { URL(string: "magio://view/files")! }
    static func instances() -> URL { URL(string: "magio://view/instances")! }
    static func session(_ id: String) -> URL {
        let encoded = id.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? id
        return URL(string: "magio://session/\(encoded)") ?? newSession()
    }
}

// MARK: - Timeline provider

struct OverviewEntry: TimelineEntry {
    let date: Date
    let snapshot: WidgetSnapshot
}

struct OverviewProvider: TimelineProvider {
    func placeholder(in context: Context) -> OverviewEntry {
        OverviewEntry(date: Date(), snapshot: .empty)
    }

    func getSnapshot(in context: Context, completion: @escaping (OverviewEntry) -> Void) {
        completion(OverviewEntry(date: Date(), snapshot: WidgetStore.load()))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<OverviewEntry>) -> Void) {
        // The app/NSE reload timelines (WidgetCenter) when the snapshot changes, but with several
        // widgets sharing the app's WidgetKit reload budget iOS can refresh them unevenly and
        // leave one stale. Ask for a periodic refresh too so every widget independently re-reads
        // the shared snapshot and converges to the latest state (budget permitting).
        let entry = OverviewEntry(date: Date(), snapshot: WidgetStore.load())
        let nextRefresh = Date().addingTimeInterval(10 * 60)
        completion(Timeline(entries: [entry], policy: .after(nextRefresh)))
    }
}

// MARK: - Logo (full Magio mark drawn from the SVG)

/// The Magio logo, drawn to match packages/web/public/logo-dark-512x512.svg: the C-spark -
/// a four-pointed star with a smaller companion star at the upper right. The main star is
/// stroked over a low-opacity `.primary` fill so the system tint on the Lock Screen / Control
/// Center reads as a translucent fill (no colour) rather than a flat wireframe, and the
/// companion is solid, mirroring how the cube's top-face mark was drawn solid. Coordinates are
/// the SVG's 1024-space art: the mark spans x 168…881.2, y 168…856.
struct SparkLogoView: View {
    var body: some View {
        Canvas { context, size in
            let minX: CGFloat = 168
            let maxX: CGFloat = 881.2
            let minY: CGFloat = 168
            let maxY: CGFloat = 856
            let scale = min(size.width / (maxX - minX), size.height / (maxY - minY))
            let cx = size.width / 2
            let cy = size.height / 2
            // Stroke tracks the fitted mark the way the cube's did: 3 SVG units per unit of the
            // cube's 83.136-wide span, which is ~3.6% of the fitted width, floored at 1.5pt so
            // small widget sizes keep a visible edge.
            let lineWidth = max(1.5, (maxX - minX) * scale * 0.036)

            // SVG 1024-space point → canvas point, centred on the mark's bounding box.
            func p(_ x: CGFloat, _ y: CGFloat) -> CGPoint {
                CGPoint(
                    x: cx + (x - (minX + maxX) / 2) * scale,
                    y: cy + (y - (minY + maxY) / 2) * scale
                )
            }

            var main = Path()
            main.move(to: p(512, 168))
            main.addCurve(to: p(856, 512), control1: p(528, 380), control2: p(644, 496))
            main.addCurve(to: p(512, 856), control1: p(644, 528), control2: p(528, 644))
            main.addCurve(to: p(168, 512), control1: p(496, 644), control2: p(380, 528))
            main.addCurve(to: p(512, 168), control1: p(380, 496), control2: p(496, 380))
            main.closeSubpath()

            // Companion: the same star scaled 0.3 and translated (624.4, 142.4) in the SVG.
            // Baked here so the drawing needs no transform of its own.
            var companion = Path()
            companion.move(to: p(778, 193))
            companion.addCurve(to: p(881, 296), control1: p(783, 256), control2: p(818, 291))
            companion.addCurve(to: p(778, 399), control1: p(818, 301), control2: p(783, 336))
            companion.addCurve(to: p(675, 296), control1: p(773, 336), control2: p(738, 301))
            companion.addCurve(to: p(778, 193), control1: p(738, 291), control2: p(773, 256))
            companion.closeSubpath()

            context.fill(main, with: .color(.primary.opacity(0.25)))
            context.stroke(main, with: .color(.primary), style: StrokeStyle(lineWidth: lineWidth, lineJoin: .round))
            context.fill(companion, with: .color(.primary))
        }
    }
}
