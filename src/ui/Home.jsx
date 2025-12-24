import CreateUser from '../features/user/CreateUser'
import Username from '../features/user/Username';
function Home() {
  return (
    <div className='my-10 text-center px-8 py-8 border border-stone-300 rounded-lg shadow-md max-w-md mx-auto'>
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
