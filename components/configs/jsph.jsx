export const
config = {
    columns: [
        { title: 'img', content: ({ img }) => <img src={img} style={{width:"200px", height:"200px"}}/> },
        { title: 'productName', content: item => item.productName },
        { title: 'price', content: ({ price }) => price },
        { title: 'des', content: ({ des }) => des },
        
    ]
};