import { Link } from "react-router-dom";

const Games = () => {
  return (
    <>
      <div class="card" style={{ width: "18rem" }}>
        <img src="..." class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Reaction Test</h5>
          <p class="card-text">
            Test your reflexes and see how quickly you can respond to the
            signal.
          </p>
          <center>
            <Link href="#" class="btn btn-primary" to="/reaction_test">
              Play Now
            </Link>
          </center>
        </div>
      </div>
      <div class="card" style={{ width: "18rem" }}>
        <img src="..." class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Snake</h5>
          <p class="card-text">
            Eat, grow, and survive. Avoid collisions while chasing the highest
            score.
          </p>
          <center>
            <Link href="#" class="btn btn-primary" to="/snake">
              Play Now
            </Link>
          </center>
        </div>
      </div>
      <div class="card" style={{ width: "18rem" }}>
        <img src="..." class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Simon Says</h5>
          <p class="card-text">
            Memorize the sequence and repeat it perfectly. How far can your
            memory take you?
          </p>
          <center>
            <Link href="#" class="btn btn-primary" to="/simonsays">
              Play Now
            </Link>
          </center>
        </div>
      </div>
      <div class="card" style={{ width: "18rem" }}>
        <img src="..." class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">2048</h5>
          <p class="card-text">
            Merge matching tiles, plan your moves, and reach the legendary 2048
            tile.
          </p>
          <center>
            <Link href="#" class="btn btn-primary" to="/2048">
              Play Now
            </Link>
          </center>
        </div>
      </div>
    </>
  );
};
export default Games;
