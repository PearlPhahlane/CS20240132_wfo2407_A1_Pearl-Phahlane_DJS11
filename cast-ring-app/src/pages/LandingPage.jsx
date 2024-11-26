import { Link } from "react-router-dom";
import "./landingPage.css";

export default function LandingPage() {
    return (
      <div className="landing-container">
        <h1>Tune In. Listen Up. Stay Inspired.</h1>
        <p>
          Explore our selection of podcasts, from true crime to comedy, tech to
          wellness—your next favorite show is just a click away. Start listening
          now and let the stories unfold!
        </p>
        <Link>Start Listening Now</Link>
      </div>
    );
}