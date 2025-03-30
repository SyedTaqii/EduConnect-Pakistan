// src/components/admin/ReportCharts.jsx
const ReportCharts = ({ data }) => {
    return (
        <div className="charts">
            <div>
                <h4>Popular Subjects</h4>
                <ul>{data.popularSubjects?.map((s) => <li key={s.name}>{s.name} ({s.count})</li>)}</ul>
            </div>

            <div>
                <h4>Completion Rate</h4>
                <p>{data.completionRate}% of sessions completed</p>
            </div>

            <div>
                <h4>City Usage</h4>
                <ul>{data.usageByCity?.map((c) => <li key={c.city}>{c.city}: {c.count}</li>)}</ul>
            </div>

            <div>
                <h4>User Growth</h4>
                <ul>{data.userGrowth?.map((m) => <li key={m.month}>{m.month}: {m.count} users</li>)}</ul>
            </div>
        </div>
    );
};

export default ReportCharts;
