export default function Page() {
    return <main>

    <div style={{ position: 'absolute', left: '30px', top: '100px', width: '95%', height: '80%', border: '1px solid black', backgroundColor: 'white'  }}>
        
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '10%', backgroundColor: '#002855', paddingLeft: '15px', paddingRight: '15px' }}>
        
            <h6 style={{ margin: 1, fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Contacts</h6>

            <a href="#" style={{ textDecoration: 'none' }}>
                <button style={{ width: '110px', height: '30px', borderRadius: '15px', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid black', color: '#002855', fontWeight: 'bold' }}>
                 Add Contact
                </button>
            </a>
        
        </div>

        <div style={{ paddingTop: '15px', paddingLeft: '15px' }}>
            <span style={{ color: '#002855', fontSize: '16px', marginLeft:'8px', marginRight: '140px', fontWeight: 'bold' }}>Name:</span>
            <span style={{ color: '#002855', fontSize: '16px', marginRight: '200px', fontWeight: 'bold' }}>Address:</span>
            <span style={{ color: '#002855', fontSize: '16px', marginRight: '250px', fontWeight: 'bold' }}>Phone Number:</span>
            <span style={{ color: '#002855', fontSize: '16px', marginRight: '300px', fontWeight: 'bold' }}>Email:</span>
            <span style={{ color: '#002855', fontSize: '16px', fontWeight: 'bold' }}>Actions:</span>
        </div>

        <hr style={{ position: 'absolute', width: 'calc(100% - 40px)', top: '18%', left: '20px', transform: 'translateY(-50%)', border: 'none', borderBottom: '2px solid black' }} />

    </div>


    </main>;
  }