import Reviews from "./Reviews";
import './styles/home.css'

function Home({ user, reviews }) {

  if (user) {
    return (
      <div className="main-wrapper">
        <h6 className="welcome">Welcome, {user.username}!</h6>
        <Reviews reviews={reviews} user={user} />
      </div>
    )
  } else {
    return (
    <div className="home-wrapper">
      <h5 className="blurb">The review site to help you decide if you should get the piece that you've been eyeing</h5>
      <h1>Please Login or Sign Up to continue</h1>
    </div>
    )
  }
}

export default Home;
