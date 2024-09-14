import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className=" h-full flex flex-col items-center justify-center">
      <p>صفحه اصلی سایت</p>
      <p>
        برای ورود به پنل{" "}
        <Link href="dashboard" className="text-blue-400">
          اینجا
        </Link>{" "}
        کلیک کنید
      </p>
    </div>
  );
};

export default page;
