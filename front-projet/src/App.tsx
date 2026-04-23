import { Layout } from './components/Layout';

function App() {

  return (
    <Layout>
      <div className="flex flex-col gap-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg h-full">
          <div className="lg:col-span-2">
          </div>
          <div className="lg:col-span-1 h-[400px]">
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
