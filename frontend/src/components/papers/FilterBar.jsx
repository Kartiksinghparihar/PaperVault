function FilterBar() {
  return (
    <div className="grid md:grid-cols-4 gap-4 mb-10">

      <select className="bg-slate-900 p-4 rounded-xl text-white">
        <option>Branch</option>
        <option>CSE</option>
        <option>IT</option>
      </select>

      <select className="bg-slate-900 p-4 rounded-xl text-white">
        <option>Semester</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>

      <select className="bg-slate-900 p-4 rounded-xl text-white">
        <option>Year</option>
        <option>2024</option>
        <option>2023</option>
      </select>

      <select className="bg-slate-900 p-4 rounded-xl text-white">
        <option>Exam Type</option>
        <option>Mid Sem</option>
        <option>End Sem</option>
      </select>

    </div>
  );
}

export default FilterBar;