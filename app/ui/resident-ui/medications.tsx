export default function Medications() {
    return (
        <main className="grow bg-white py-16">
          <div className="mx-auto max-w-7xl">
            
            <div className={`rounded border-8 border-wvu-primary-blue bg-wvu-primary-blue text-2xl font-bold text-white antialiased flex items-center justify-between`}>
              <span>Manage Medications</span>
              <button className="w-40 h-8 text-sm rounded-full bg-white flex justify-center items-center border-2 border-black font-bold hover:bg-gold-500 hover:text-white">
                <tr className={'text-lg font-bold text-wvu-primary-blue antialiased'}>
                  Add Medication
                </tr>
              </button>
            </div>
    
            <br />
    
            <table className="table table-auto">
              <thead>
                <tr className={`text-2xl font-bold text-wvu-primary-blue antialiased`}>
                  <th>Prescribed By</th>
                  <th>Prescribed Date</th>
                  <th>Medication</th>
                  <th>Instructions</th>
                  <th>Refills</th>
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

