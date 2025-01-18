const FilterHeadings = () => {
  return (
    <div className="grid grid-cols-[90px_2fr_2fr_80px] gap-4 px-5 text-gray-300 text-sm pb-2">
      <div>
        <span className="cursor-pointer hover:text-teal-600 transition-colors">
          #
        </span>
      </div>
      <div>
        <span className="cursor-pointer hover:text-teal-600 transition-colors">
          Title
        </span>
      </div>

      <div>
        <span className="cursor-pointer hover:text-teal-600 transition-colors">
          Album
        </span>
      </div>

      <div>
        <span className="cursor-pointer hover:text-teal-600 transition-colors">
          Duration
        </span>
      </div>
    </div>
  );
};

export default FilterHeadings;
