export default function Contacts() {
    return (
      <main className="grow bg-white py-16">
        <div className="mx-auto max-w-7xl">
          
          <div className={`rounded border-8 border-wvu-primary-blue bg-wvu-primary-blue text-2xl font-bold text-white antialiased flex items-center justify-between`}>
            <span>Manage Contacts</span>
            <button className="w-32 h-8 text-sm rounded-full bg-white flex justify-center items-center border-2 border-black font-bold hover:bg-gold-500 hover:text-white">
              <tr className={'text-lg font-bold text-wvu-primary-blue antialiased'}>
                Add Contact
              </tr>
            </button>
          </div>
  
          <br />
  
          <table className="table table-auto">
            <thead>
              <tr className={`text-2xl font-bold text-wvu-primary-blue antialiased`}>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-lg text-black">
                <td>Filler</td>
                <td>Filler</td>
                <td>Filler</td>
                <td>Filler</td>
                <td>Filler</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    );
  }
  