export function Modal({ children, setModalOpen }) {
    return (
      <div className="modal-background">
        <div className="modal-content  playlist-modal-width">
          <div
            className="flex-horizontal border-bottom gray-border center-align space-between"
            style={{ height: "2.5rem" }}
          >
            <div className="padding-left">Save to</div>
            <div>
              <button
                onClick={() => setModalOpen(false)}
                className=" btn-box cursor-pointer"
              >
                <span className=" material-icons-outlined icon-color-gray ">
                  close
                </span>
              </button>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    );
  }