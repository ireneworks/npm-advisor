"use client";
import Footer from "#components/footer/Footer";
import SearchInputContainer from "#components/navigation/_containers/SearchInputContainer";

export default function Home() {
  return (
    <>
      <div className="pt-20 pb-24 px-12">
        <h1 className="text-4xl font-black mb-5 text-gray-900">NPM Advisor</h1>
        <h2 className="text-lg mb-10 text-gray-600">
          Get advice on which NPM packages might fit your environment.
        </h2>
        <SearchInputContainer />
      </div>
      <Footer />
    </>
  );
}
