import CreateUser from '../features/user/CreateUser'
import Username from '../features/user/Username';
function Home() {
  return (
    <div className='my-10 px-4 text-center sm:my-16'>
      <h1 className="text-center text-xl font-semibold mb-8 md:text-3xl text-stone-700">
        The best pizza.
        <br />
        <span className="text-yellow-500">

        Straight out of the oven, straight to you.
        </span>
      </h1>

      <CreateUser />

      <Username />
    </div>
  );
}

export default Home;
