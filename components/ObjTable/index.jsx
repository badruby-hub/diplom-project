

export function ObjTable({ data, config }) {
    console.debug('ObjTable render');
    return <table>
        <Thead config={config} />
        <Tbody data={data} config={config} />
    </table>
}

function Thead({ config }) {
    return <thead>
        <tr>
            {config.columns.map(c => <td key={c.title}>{c.title}</td>)}
        </tr>
    </thead>
}

function Tbody({ data, config }) {
    return <tbody>
        {data.map(obj => <tr key={obj.id} data-id={obj.id}>
            {config.columns.map(({ title, content }) => <td key={title}>{content(obj)}</td>)}
        </tr>)}
    </tbody>
}