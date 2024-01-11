import React, { useRef, useState } from 'react'
import ListItemCard from './ListItemCard'

const Listview = ({items,listNo,handleSelectedLists,createMode,setCreateMode,moveListItem,isNewList,moveItemBackToList}) => {

  const [isChecked,setIsChecked] = useState(false);
  const checkedRef=useRef(isChecked);
  const handleCheckboxChange=()=>{
    setIsChecked(!isChecked);
    checkedRef.current=!isChecked;
    console.log(checkedRef.current)

    if(checkedRef.current){
      handleSelectedLists(listNo,"add");
    }
    else handleSelectedLists(listNo,"remove")
    
  }
  return (
    <div className="list-view m-3 p-3">
        { !createMode && <div className="mx-2">
            <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} id={listNo} /> <label className='mx-2' htmlFor={listNo}><h4>List {listNo}</h4></label>
        </div>}
        {
          createMode && 
          <div><h4>List {listNo} ({items.length})</h4></div>
        }
        {
            items.map((item)=>{
                return <ListItemCard key={item.id} id={item.id} name={item.name} description={item.description} moveListItem={moveListItem} createMode={createMode} isNewList={isNewList} moveItemBackToList={moveItemBackToList} className="m-2"/>
            })
        }
    </div>
  )
}

export default Listview
