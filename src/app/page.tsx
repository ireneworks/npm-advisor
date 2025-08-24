"use client";
import SearchInputContainer from "../component/searchInput/_containers/SearchInputContainer";

export default function HomePage() {
  return (
    <div className="flex-1 pt-8 pb-12 px-4 lg:pt-20 lg:pb-24 lg:px-12">
      <h1 className="text-indigo-600 text-2xl font-black mb-3 lg:text-4xl lg:mb-5">
        npm Advisor
      </h1>
      <h2 className="text-[14px] mb-5 text-gray-600 lg:text-lg lg:mb-10 ">
        Get advice on which npm packages might fit your environment.
      </h2>
      <SearchInputContainer />
    </div>
  );
}
