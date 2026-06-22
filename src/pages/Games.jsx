import { Link } from "react-router-dom";

const Games = () => {
  return (
    <>
      <div
        className="card main-card"
        style={{ width: "18rem", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
      >
        <img
          src="ReactionTest.png"
          className="card-img-top"
          alt="Reaction_test_game"
        />
        <div className="card-body">
          <h5 className="card-title">Reaction Test</h5>
          <p className="card-text">
            Test your reflexes and see how quickly you can respond to the
            signal.
          </p>
          <center>
            <Link href="#" className="btn btn-primary" to="/reaction_test">
              Play Now
            </Link>
          </center>
        </div>
      </div>
      <div
        className="card"
        style={{ width: "18rem", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
      >
        <img src="Snake.png" className="card-img-top" alt="Snake_game_image" />
        <div className="card-body">
          <h5 className="card-title">Snake</h5>
          <p className="card-text">
            Eat, grow, and survive. Avoid collisions while chasing the highest
            score.
          </p>
          <center>
            <Link href="#" className="btn btn-primary" to="/snake">
              Play Now
            </Link>
          </center>
        </div>
      </div>
      <div
        className="card"
        style={{ width: "18rem", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
      >
        <img
          src="SimonSays.png"
          className="card-img-top"
          alt="Simon_says_image"
        />
        <div className="card-body">
          <h5 className="card-title">Simon Says</h5>
          <p className="card-text">
            Memorize the sequence and repeat it perfectly. How far can your
            memory take you?
          </p>
          <center>
            <Link href="#" className="btn btn-primary" to="/simonsays">
              Play Now
            </Link>
          </center>
        </div>
      </div>
      <div
        className="card"
        style={{ width: "18rem", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
      >
        <img src="2048.png" className="card-img-top" alt="2048_image" />
        <div className="card-body">
          <h5 className="card-title">2048</h5>
          <p className="card-text">
            Merge matching tiles, plan your moves, and reach the legendary 2048
            tile.
          </p>
          <center>
            <Link href="#" className="btn btn-primary" to="/2048">
              Play Now
            </Link>
          </center>
        </div>
      </div>
    </>
  );
};
export default Games;
