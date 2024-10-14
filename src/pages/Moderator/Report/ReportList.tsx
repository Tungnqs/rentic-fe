import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { approveReportById, deleteReportById, getAllReports, selectAllReport, selectLoadingStatus } from "../../../store/slices/report.slice";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";

export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const ReportList = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllReports());
  }, []);
  const allReports = useSelector(selectAllReport);
  const loadingStatus = useSelector(selectLoadingStatus);
  
  const handleApprovePost = (id: string) =>{
    dispatch(approveReportById(id))
  }
  
  const handleDeleteReport = (id: string) =>{
    dispatch(deleteReportById(id));
  } 

  return (
    <div className="p-8 max-sm:p-2 bg-bgDarkPrimary text-grayLight2 min-h-screen flex flex-col gap-5">
      {loadingStatus === "loading" && <LoadingScreen />}
      <div className="text-[24px] font-semibold">Report Management</div>
      <div className="text-red-600 font-semibold hidden max-[550px]:block">*Recommend to use application in landscape view</div>
      <div style={{ transform: 'rotateX(180deg)' }} className="relative overflow-x-auto shadow-md darkScrollBar sm:rounded-lg">
        <table style={{ transform: 'rotateX(180deg)' }} className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                Report Date
              </th>
              <th scope="col" className="px-2 py-3">
                Reason
              </th>
              <th scope="col" className="px-2 py-3">
                PostId
              </th>
              <th scope="col" className="px-2 py-3">
                Post Title
              </th>
              <th scope="col" className="px-2 py-3">
                Reported by
              </th>
              <th scope="col" className="px-2 py-3">
                Status
              </th>
              <th scope="col" className="px-2 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allReports.map((report, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } border-b dark:border-gray-700`}
              >
                <th
                  scope="row"
                  className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1/6  overflow-hidden"
                >
                  {formatDate(report.createdAt as string)}
                </th>
                
                <td className="px-2 py-4 w-1/6 min-w-fit break-words">{report.reason}</td>
                <td className="px-2 py-4 max-w-[150px] overflow-hidden truncate">{report.postId}</td>
                <td className="px-2 py-4 w-1/6 truncate overflow-hidden">{report.post.title}</td>
                <td className="px-2 py-4 w-1/6 truncate overflow-hidden">{report.user.firstName}, {report.user.lastName}</td>
                <td className="px-2 py-4 w-1/6 truncate overflow-hidden">{report.status === "ACCEPTED" ? <span className="text-secondaryYellow">{report.status}</span> : <span>{report.status}</span>}</td>
                <td className="px-2 py-4 w-1/6 select-none">
                  <div className="w-full flex flex-col gap-2 text-center">
                  {report.status === "ACCEPTED" ?
                   <div className="font-medium cursor-not-allowed">Approved</div> 
                   : 
                    (<div
                        onClick={()=>handleApprovePost(report.id as string)}
                        className="font-medium text-green-500 hover:underline cursor-pointer"
                    >
                        Approve
                    </div>) }
                    
                    <div
                        onClick={()=>handleDeleteReport(report.id as string)}
                        className="font-medium text-red-600 hover:underline cursor-pointer"
                    >
                        Delete
                    </div>
                    <Link
                        to={`/posts/${report.postId}`}
                        className="font-medium text-grayLight2 hover:underline cursor-pointer"
                    >
                        View post detail
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportList;
