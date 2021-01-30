import logo from './logo.svg';
import { useState, useEffect } from 'react';


import firebase from 'firebase/app';
import 'firebase/firestore';
import { list } from 'postcss';

function App() {
  const firebaseConfig = {
      apiKey: "AIzaSyDBcL-Fr3rU38CotDahADneF4E0kjYPKkw",
      authDomain: "dsc-fire-test.firebaseapp.com",
      projectId: "dsc-fire-test",
      storageBucket: "dsc-fire-test.appspot.com",
      messagingSenderId: "250920873543",
      appId: "1:250920873543:web:5495ff91ea8e1f8e2e0b62",
      measurementId: "G-P17ZGG1EEG"
  }

  // Initialize Firebase
  if( firebase.apps.length === 0 ){
   firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();

	const [ title, setTitle ] = useState('');
	const [ desc, setDesc ] = useState('');

  const [todos, setTodos] = useState([]);


  const test = () => {
    db
    .collection("notes")
    .add({
          title: "Working 222222222",
          body: "This is to check the Integration is working",
        })
  }
  
  // test()

  const fetchtododata = () => {
    db.collection("todolist")
    .onSnapshot(snapshot => {
      // console.log(snapshot);
      
      const list2 = []
      snapshot.docs.map(doc => list2.push({id: doc.id, ...doc.data()}))
      
      setTodos(list2)
    })
  }

  useEffect(() => {
    fetchtododata()
  }, [])

	const handleSubmit = (e) => {
		e.preventDefault();
		// setTodos([ ...todos, { title: title, desc: desc } ]);

    db.collection("todolist").add({
      title: title, 
      desc : desc
    })

    setTitle("")
    setDesc("")
    
  };
  
  const handleDelete = (key) => {
    
    db.collection("todolist").doc(key).delete()
  }

	return (
		<div>
			<div className="flex justify-center">
				<div className="px-10 pt-5 bg-gray-200  pb-5 w-9/12">
					<h1 className="text-lg font-sans font-bold flex">Pekerjaan Rumah</h1>

					<form onSubmit={(e) => handleSubmit(e)}>
						{/* form buat title */}
						<label>
							<span className="text-gray-700 self-start">Title</span>
							<input
								onChange={(e) => setTitle(e.target.value)}
								value={title}
								type="text"
								className="mt-2 shadow-md rounded-md h-10 w-full px-2"
							/>
						</label>

						{/* form buat deskripsi */}
						<label className="block flex-col border-black mt-5">
							<span className="text-gray-700 self-start">Deskripsi</span>
							<input
								value={desc}
								onChange={(e) => setDesc(e.target.value)}
								type="text"
								className="form-input mt-1 shadow-md rounded-md block w-full h-10  px-2"
							/>
						</label>

            {/* SUBMIT BUTTON */}
						<button className="p-2 bg-blue-400 shadow-md rounded-md mt-5 text-white">Submit</button>
					</form>

          {/* LIST TODO  */}
					<div className="border py-4 mt-5 space-y-3">
						{todos.map((pertodo) => {
							return (
                <div
                  key={pertodo.id}
                  className="shadow bg-white border  rounded py-2 px-3 text-grey-darker w-full">
                  {/* TITLE */}
                  <p className="font-bold text-lg">{pertodo.title}</p>
                  
                  {/* DESC  */}
									<p className="text-grey-darker mb-2 "> {pertodo.desc}</p>
                  
                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(pertodo.id)}
                    className="p-2 bg-red-500 text-yellow-100"> delete</button>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
