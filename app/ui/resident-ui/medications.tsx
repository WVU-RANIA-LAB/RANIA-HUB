export default function Medications() {
    return (
        <main className="grow bg-white py-16">
          <div className="mx-auto max-w-7xl">
            
            <div className={`rounded border-8 border-wvu-primary-blue bg-wvu-primary-blue text-2xl font-bold text-white antialiased flex items-center justify-between`}>
              <span>Medications</span>
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

