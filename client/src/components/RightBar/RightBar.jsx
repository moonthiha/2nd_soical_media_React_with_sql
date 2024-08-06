import "./rightbar.scss";

export default function RightBar() {
  return (
    <div className="rightbar">
      <div className="container">
      {/* Suggestions For You */}
        <div className="menu">
          <p>Suggestions For You</p>
          <div className="item">
            <div className="userInfo">
              <img src="../profile/profile1.jpg" alt=""  />
              <span>Alice</span>
            </div>
            <div className="button_group">
              <button  className="follow">Follow</button>
              <button className="dismiss">Dismiss</button>
            </div>
          </div>

          <div className="item">
            <div className="userInfo">
              <img src="../profile/profile2.jpg" alt=""  />
              <span>John Doe</span>
            </div>
            <div className="button_group">
              <button  className="follow">Follow</button>
              <button className="dismiss">Dismiss</button>
            </div>
          </div>
        </div>

        <div className="latest">
          <p>Latest Activities </p>

          <div className="latest_item">
            <div className="userInfo">
              <img src="../profile/profile1.jpg" alt=""  />
              <span>Alice</span>
            </div>

            <div className="action">
              <p>Changed their cover picture</p>
            </div>

            <div className="time_line">
              <small>1 min ago</small>
            </div>
          </div>

          <div className="latest_item">
            <div className="userInfo">
              <img src="../profile/profile2.jpg" alt=""  />
              <span>John Doe</span>
            </div>

            <div className="action">
              <p className="action_text">Changed their cover picture</p>
            </div>

            <div className="time_line">
              <small>1 min ago</small>
            </div>
          </div>

          <div className="latest_item">
            <div className="userInfo">
              <img src="../profile/profile3.jpg" alt=""  />
              <span>Eduardo</span>
            </div>

            <div className="action">
              <p className="action_text">Changed their cover picture</p>
            </div>

            <div className="time_line">
              <small>1 min ago</small>
            </div>
          </div>
        </div>

        <div className="online">
          <p>Online Friends</p>
          <div className="online_item">
            <div className="userInfo">
              <img src="../profile/profile1.jpg" alt=""  />
              <div className="dot"></div>
              <span>Alice</span>
            </div>
          </div>

          <div className="online_item">
            <div className="userInfo">
              <img src="../profile/profile2.jpg" alt=""  />
              <div className="dot"></div>
              <span>John Doe</span>
            </div>
          </div>

          <div className="online_item">
            <div className="userInfo">
              <img src="../profile/profile3.jpg" alt=""  />
              <div className="dot"></div>
              <span>Rose</span>
            </div>
          </div>

          <div className="online_item">
            <div className="userInfo">
              <img src="../profile/profile4.jpg" alt=""  />
              <div className="dot"></div>
              <span>King</span>
            </div>
          </div>

          <div className="online_item">
            <div className="userInfo">
              <img src="../profile/profile5.jpg" alt=""  />
              <div className="dot"></div>
              <span>Eduardo</span>
            </div>
          </div>

          <div className="online_item">
            <div className="userInfo">
              <img src="../profile/profile1.jpg" alt=""  />
              <div className="dot"></div>
              <span>Mosco</span>
            </div>
          </div>

          <div className="online_item">
            <div className="userInfo">
              <img src="../profile/profile2.jpg" alt=""  />
              <div className="dot"></div>
              <span>John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
