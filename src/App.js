import { useEffect, useRef, useState } from 'react';
import './App.css';
import Listview from './components/Listview';
import CreateList from './components/CreateList';

function App() {
  let [list,setList]=useState([]);
  let maxListNo=0;
  let [selectedLists,setSelectedLists]=useState([]);
  let selectedListsRef=useRef(selectedLists);
  let [listNos,setListNos]=useState([]);
  let [createMode,setCreateMode]=useState(false);
  let [listHistory,setListHistory]=useState([]);
  let [loading,setLoading]=useState(true);
  
  
  const handleSelectedLists=(val,operation)=>{
        if(operation==="add"){
          setSelectedLists([...selectedLists,val]);
          selectedListsRef.current=[...selectedLists,val];
          
        }
        else if(operation==="remove"){
          let idx=selectedLists.indexOf(val);
          console.log(selectedLists[idx])
          if(idx!==-1){
            let temList=[...selectedListsRef.current]
            temList.splice(idx,1);
            console.log(temList)
           setSelectedLists(temList);
           selectedListsRef.current=temList
           
          }
        }
        console.log(selectedListsRef.current)
        
        if(selectedListsRef.current.length==2){
          document.getElementById("error-box").innerHTML=""
        }
  }
  const moveItemBackToList=(id,listDirection)=>{
    setList(list.map(item=>{
      if(item.id==id){
        if(listDirection==='left')
          return {...item,list_number:selectedListsRef.current[0]}
        else return {...item,list_number:selectedListsRef.current[1]}

      }
      else return {...item}
    }))
  }
  const moveListItem=(id)=>{
      setList(list.map(item=>{
        if(item.id==id){
          console.log({...item,list_number:selectedListsRef.current[1]+1})
          return {...item,list_number:selectedListsRef.current[1]+1}
        }
        else return {...item}
      }))
  }

  useEffect(()=>{
     fetch("https://apis.ccbp.in/list-creation/lists").then(res=>res.json()).then(res=>{
      console.log(res)
      setList(res.lists);
      res.lists.map(item=>{
        if(item.list_number>maxListNo) maxListNo=item.list_number;
      });
      setListNos([...Array(maxListNo).keys()].map(num=>num+1));
      setLoading(false);
      
    }).catch(err=>{
      console.log(err)
    })
    
  },[])

  const handleCancel=()=>{
    setList(listHistory);
    setCreateMode(false);
    setSelectedLists([])
    selectedListsRef.current=[]
  }
  const handleUpdate=()=>{
    setCreateMode(false);
    setSelectedLists([])
    setListNos(prev=>[...prev,prev.length+1])
  }
  const handleCreateList=()=>{
    if(selectedListsRef.current.length!=2) {
      document.getElementById("error-box").innerHTML="<p>You should select exactly two lists to create a new list </p>"
    }
    else{ 
      setCreateMode(true);
      setListHistory(list);
    }
    console.log(selectedLists)
  }
  return (
    <div className="App">
      {
        loading && <div className='text-center m-5'><div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div></div>
      }
      { !createMode && !loading && <div>
      <div className='text-center'>
        <h2 className='my-2'>List Creation</h2>
        <button onClick={handleCreateList} className='btn btn-primary my-2'>Create a new list</button>
        </div>
      <div id="error-box" className='text-center text-danger my-2'></div>
      <div className='d-flex my-3'>
      {
        listNos.map(listNo=>(
          <Listview key={listNo} items={list.filter(item=>item.list_number==listNo)} listNo={listNo} handleSelectedLists={handleSelectedLists} createMode={createMode} setCreateMode={setCreateMode}/>
        ))
      }
      </div>
      </div>}
      {
        createMode && !loading && <div>
          <CreateList list={list} selectedLists={[...selectedListsRef.current]} createMode={createMode} setCreateMode={setCreateMode} setList={setList} moveListItem={moveListItem} handleCancel={handleCancel} handleUpdate={handleUpdate} moveItemBackToList={moveItemBackToList} />
        </div>
      }
    </div>
  );
}

export default App;
