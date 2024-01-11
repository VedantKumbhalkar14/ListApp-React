import React from 'react'
import Listview from './Listview'

const CreateList = ({list,selectedLists,createMode,setCreateMode,moveListItem,handleCancel,handleUpdate,moveItemBackToList}) => {
  return (
    <>
    <div className='d-flex'>
      <Listview items={list.filter(item=>item.list_number==selectedLists[0])} listNo={selectedLists[0]} createMode={createMode} setCreateMode={setCreateMode} moveListItem={moveListItem} isNewList={false} moveItemBackToList={moveItemBackToList} />
      <Listview items={list.filter(item=>item.list_number==selectedLists[1]+1)} listNo={selectedLists[1]+1} createMode={createMode} setCreateMode={setCreateMode} isNewList={true} moveItemBackToList={moveItemBackToList} />
      <Listview items={list.filter(item=>item.list_number==selectedLists[1])} listNo={selectedLists[1]} createMode={createMode} setCreateMode={setCreateMode} moveListItem={moveListItem} isNewList={false} moveItemBackToList={moveItemBackToList} />
    </div>
    <div className='d-flex flex-row-reverse mt-2' style={{width:"70vw"}}>
    <button  className='btn btn-outline-secondary m-2' onClick={handleCancel}>Cancel</button>
    <button className='btn btn-primary m-2' onClick={handleUpdate}>Update</button>
    </div>
    </>
  )
}

export default CreateList
