const JSONTable = ({data}) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-500">No data available</div>;
  }

    const headers = Object.keys(data[0]);

    return (
        <div className="sql-table">
        <table>
            <thead>
            <tr>
                {headers.map((header) => (
                <th
                    key={header}
                >
                    {header}
                </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
                <tr key={index}>
                {headers.map((header) => (
                    <td
                    key={header}
                    >
                    {row[header]}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default JSONTable;