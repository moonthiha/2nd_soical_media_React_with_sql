import "./stories.scss";

export default function Stories() {
  return (
    <div className="stories">
        <div className="card">
            <img src="./profile/profile1.jpg" alt="" />
            <button>+</button>
            <span>John Doe</span>
        </div>

        <div className="card">
            <img src="./profile/profile2.jpg" alt="" />
            <span>Alice</span>
        </div>

        <div className="card">
            <img src="./profile/profile3.jpg" alt="" />
            <span>Rose</span>
        </div>

        <div className="card">
            <img src="./profile/profile5.jpg" alt="" />
            <span>Eduardo</span>
        </div>

        <div className="card">
            <img src="./profile/profile4.jpg" alt="" />
            <span>Modric</span>
        </div>
    </div>
  )
}
