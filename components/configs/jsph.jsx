export const
    config = {
        columns: [
            { title: 'id', content: ({ id }) => id, setVal: id => ({ id }) },
            { title: 'name', content: ({ name }) => name, setVal: name => ({ name }) },
            { title: 'username', content: ({ username }) => username, setVal: username => ({ username }) },

        ]
    };