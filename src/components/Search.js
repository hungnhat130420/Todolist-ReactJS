import React, { Component } from "react";

export class Search extends Component {
  render() {
    return (
      <div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập từ khóa..."
            />
            <span className="input-group-btn">
              <button className="btn btn-primary" type="button">
                <span className="fa fa-search mr-5" />
                Tìm
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
