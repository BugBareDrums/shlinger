export const Login = () => {
  return (
    <div className="h-full flex justify-end items-center">
      <p>
        well hidey hoooo
        <br />
        chose a name and attest to where you’re from
      </p>
      <form className="p-3 bg-red-400">
        <div>
          <label className="block" htmlFor="name">
            add a name
          </label>
          <input name="name" id="name" placeholder="add a name" />
        </div>
        <div>
          <label className="block" htmlFor="poo">
            add a poo (place of origin)
          </label>
          <input name="poo" id="poo" placeholder="add a poo" />
        </div>

        <button type="submit" className="bg-white text-black">
          Create
        </button>
      </form>
    </div>
  );
};
