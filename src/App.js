import { useState} from 'react';
import { Layout, Input, Button, Card,Badge} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from './services/movieSlice';


const { Header, Footer, Content } = Layout;
const { Meta } = Card;

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: "8vh",
  backgroundColor: '#7dbcea',
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  
};
const contentStyle = {
  textAlign: 'center',
  display: "flex",
  flexWrap:"wrap",
  justifyContent: "center",
  paddingTop:"2rem",
  color: '#fff',
  backgroundColor: '#108ee9',
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};




function App() {

  const [filterText, setFilterText] = useState("")

  const dispatch = useDispatch();
  const {movies, loading } = useSelector(state=> state.movie);

  const search = ()=> dispatch(getMovies(filterText))

  

  return (
    <div className="App" >
    <Layout >
      <Header style={headerStyle}>

      <Input style={{
        width:"45%"}} 
        size="large" 
        placeholder="Search movie"
        prefix={<SearchOutlined />} 
        onChange={(e)=>setFilterText(e.target.value)}
        />
          {
            loading ? (
              <Button style={{marginLeft:"1rem"}} size="large" type="primary" icon={<SearchOutlined />} loading>
              Searching...
            </Button>
            ) : (
              <Button style={{marginLeft:"1rem"}} size="large" type="primary" icon={<SearchOutlined />} onClick={()=> search() }>
              Search
            </Button>
            )
          }
       

      </Header>
      <Content style={contentStyle}>
            {
              movies.map(item=> (
                <Card
                hoverable
                style={{
                  width: 400,
                  height: 800,
                  margin: "5px"
                }}
                cover={<img alt="example" src={item.imageurl ? item.imageurl : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} />}
              >
                <Meta title={item.title} description={item.synopsis ? item.synopsis : "Description is not available"} />
                <Badge count={item.genre ? item.genre[0] : "no-topic"} />
                 <hr />
                 <div style={{display:"flex"}}><span style={{marginRight:"1rem"}}><b>Type:</b></span> <span>{item.type}</span> </div>
                 
              </Card>
              ))
            }
      </Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>

    </div>
  );
}

export default App;
