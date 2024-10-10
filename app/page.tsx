import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      {/* <PageWrapper>
      <CarouselShow />

      <SideBySide />
    </PageWrapper> */}

      <div className="w-full lg:grid h-[100dvh] lg:grid-cols-2">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-xl font-bold">ورود به پنل کاربری</h1>

              <p>
                برای ورود به پنل{" "}
                <Link href="dashboard" className="text-blue-400">
                  اینجا
                </Link>{" "}
                کلیک کنید
              </p>
            </div>
          </div>
        </div>
        <div className="hidden relative bg-muted lg:block">
          <img
            src="/theater.jpg"
            alt="Image"
            className="h-full w-full object-cover max-h-[100dvh] aspect-square dark:brightness-[0.2] dark:grayscale"
          />
          <div className="absolute bottom-5 w-full text-white text-right p-3">
            <p className="text-2xl font-semibold">جلوه‌گاه هنر تئاتر اصفهان</p>
            <p>
              {" "}
              هدف ما تلاش برای زنده نگه داشتن نام و یاد کسانی است که تئاتر
              اصفهان را زنده نگه داشته‌اند.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
