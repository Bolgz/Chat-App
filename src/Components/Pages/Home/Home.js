import NavigationBar from "../../Navigation/NavigationBar";

function Home(props) {
  return (
    <div>
      <NavigationBar setAuth={props.setAuth} />
      <h1>Home</h1>
    </div>
  );
}

export default Home;
