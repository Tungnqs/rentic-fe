import React from "react";



interface ISaveCancelPopupProps {

  handleSave: () => void;

  handleCancel: () => void;

}



const SaveCancelPopup = ({ handleSave, handleCancel }: ISaveCancelPopupProps) => {

  return (

    <div className="fixed inset-x-0 bottom-0 z-50 pb-4">

      <div className="mx-auto max-w-sm">

        <div className="mx-4 flex items-center gap-3 rounded-lg bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5">

          <p className="text-sm text-gray-900">

            Save your changes?

          </p>

          

          <div className="flex items-center gap-2 ml-auto">

            <button

              onClick={handleCancel}

              className="rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"

            >

              Cancel

            </button>

            

            <button

              onClick={handleSave}

              className="rounded-md bg-amber-600 px-2.5 py-1.5 text-sm font-medium text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"

            >

              Save

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};



export default SaveCancelPopup;






