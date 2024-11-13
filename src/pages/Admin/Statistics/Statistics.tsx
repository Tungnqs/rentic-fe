import React, { ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  selectAllUserAccounts,
  selectAllUserTransactions,
} from "../../../store/slices/admin.slice";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { BreakPoint } from "../../../interfaces";
import { formatMoney } from "../../../store/slices/app.slice";
import { AccountIcon, LandLordIcon, PaymentIcon, PendingIcon, TransactionIcon } from "../../../assets/icon/icon";

ChartJS.register(
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const Statistics = () => {
  const allUserTransactions = useSelector(selectAllUserTransactions);
  const allAccounts = useSelector(selectAllUserAccounts);

  // transaction data
  const pendingTransactionCount = useMemo(() => {
    let count = 0;
    allUserTransactions.forEach((transaction) => {
      if (transaction.status === "PENDING") {
        count++;
      }
    });
    return count;
  }, [allUserTransactions]);

  const paidTransactionCount = useMemo(() => {
    let count = 0;
    allUserTransactions.forEach((transaction) => {
      if (transaction.status === "PAID") {
        count++;
      }
    });
    return count;
  }, [allUserTransactions]);

  const cancelledTransactionCount = useMemo(() => {
    let count = 0;
    allUserTransactions.forEach((transaction) => {
      if (transaction.status === "CANCELLED") {
        count++;
      }
    });
    return count;
  }, [allUserTransactions]);

  const refundedTransactionCount = useMemo(() => {
    let count = 0;
    allUserTransactions.forEach((transaction) => {
      if (transaction.status === "REFUNDED") {
        count++;
      }
    });
    return count;
  }, [allUserTransactions]);

  const totalPaidAmount = useMemo(() => {
    return allUserTransactions
      .filter((transaction) => transaction.status === "PAID")
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }, [allUserTransactions]);

  const totalPendingAmount = useMemo(() => {
    return allUserTransactions
      .filter((transaction) => transaction.status === "PENDING")
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }, [allUserTransactions]);

  //account data
  const adminCount = useMemo(() => {
    let count = 0;
    allAccounts.forEach((account) => {
      if (account.roles[0] === "ADMIN") {
        count++;
      }
    });
    return count;
  }, [allAccounts]);

  const moderatorCount = useMemo(() => {
    let count = 0;
    allAccounts.forEach((account) => {
      if (account.roles[0] === "MODERATOR") {
        count++;
      }
    });
    return count;
  }, [allAccounts]);

  const renterCount = useMemo(() => {
    let count = 0;
    allAccounts.forEach((account) => {
      if (account.roles[0] === "RENTER") {
        count++;
      }
    });
    return count;
  }, [allAccounts]);

  const landlordCount = useMemo(() => {
    let count = 0;
    allAccounts.forEach((account) => {
      if (account.roles[0] === "LANDLORD") {
        count++;
      }
    });
    return count;
  }, [allAccounts]);

  const pieAmountData = {
    labels: ["Pending", "Paid"],
    datasets: [
      {
        label: "# of VND",
        data: [totalPendingAmount, totalPaidAmount],
        backgroundColor: ["rgba(255, 206, 86, 0.7)", "rgba(75, 192, 192, 0.7)"],
        borderColor: ["rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const pieTransactionTypeData = {
    labels: ["Pending", "Paid", "Refunded", "Cancelled"],
    datasets: [
      {
        label: "# of transactions",
        data: [
          pendingTransactionCount,
          paidTransactionCount,
          refundedTransactionCount,
          cancelledTransactionCount,
        ],
        backgroundColor: [
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 99, 132, 0.7)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barRoleData = {
    labels: ["Admin", "Moderator", "Renter", "Landlord"],
    datasets: [
      {
        label: "# of Accounts",
        data: [adminCount, moderatorCount, renterCount, landlordCount],
        backgroundColor: [
          "rgba(255, 64, 64, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
        ],
        borderColor: [
          "#ff4040",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className={`min-h-screen bg-bgDarkPrimary text-grayLight2 flex justify-center`}
    >
      <div
        className={`w-[90%] max-[500px]:w-[97%] max-w-[${BreakPoint.xl}] flex flex-col gap-5 pb-10 pt-5`}
      >
        <div className="text-[24px] font-semibold">System statistics</div>
        <div className="flex gap-2 flex-wrap items-center justify-center">
          <StatisticCard
            icon={<PaymentIcon className="text-green-600 w-8" />}
            title="Total Paid Amount"
            content={`${formatMoney(totalPaidAmount)}₫`}
            description={`${paidTransactionCount} successful payments`}
          />
          <StatisticCard
            icon={<PendingIcon className="text-primaryYellow w-8" />}
            title="Total Pending Amount"
            content={`${formatMoney(totalPendingAmount)}₫`}
            description={`${pendingTransactionCount} pending payments`}
          />
          <div className="flex gap-2 flex-wrap items-center justify-center max-md:hidden">
            <StatisticCard
                icon={<LandLordIcon className="text-[#4bc0c0] w-8" />}
                title="Landlord"
                content={`${landlordCount} accounts`}
                description={`Landlord role member of the system`}
            />
            <StatisticCard
                icon={<AccountIcon className="text-secondaryYellow w-8" />}
                title="Renter"
                content={`${renterCount} accounts`}
                description={`Renter role member of the system`}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-between flex-wrap">
          <div className="flex justify-center flex-1 ">
            <div className="flex max-md:flex-col w-fit max-md:w-full max-md:items-center gap-2 shadow-md rounded-md border border-gray-600 bg-bgLeftNavbar p-5">
              <div className="w-[300px]">
                <div className="text-yellow-600 font-semibold">
                  Transaction amount{" "}
                </div>
                <div className="w-full">
                  <Pie className="w-full" data={pieAmountData} />
                </div>
              </div>
              <div className="w-[300px]">
                <div className="text-yellow-600 font-semibold">
                  Transaction type{" "}
                </div>
                <div className="w-full">
                  <Pie className="w-full" data={pieTransactionTypeData} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center flex-1 max-sm:w-full">
            <div className="flex w-fit max-sm:w-full gap-2 shadow-md rounded-md border border-gray-600 bg-bgLeftNavbar p-5">
              <div className="w-[500px] max-sm:w-full">
                <div className="text-yellow-600 font-semibold">
                  Accounts and Roles
                </div>
                <div className="w-full text-white">
                  <Bar data={barRoleData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatisticCardProps {
  icon: ReactNode;
  title: string;
  content: string;
  description: string;
}

const StatisticCard = ({
  icon,
  title,
  content,
  description,
}: StatisticCardProps) => {
  return (
    <div className="flex items-center gap-4 bg-bgLeftNavbarLighter w-fit p-3 border-2 border-gray-600 rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium text-yellow-600">{title}</div>
        <div className="text-3xl font-bold text-white">{content}</div>
        <div className="text-sm">{description}</div>
      </div>
      {icon}
    </div>
  );
};

export default Statistics;
