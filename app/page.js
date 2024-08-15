'use client'

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField, MenuItem } from '@mui/material'
import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

export default function Home() {
  const [pantry, setPantry] = useState([])
  const [type, setType] = useState('food');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemName, setItemName] = useState('')

  const updatePantry = async (filterType = null) => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      const data = { name: doc.id, ...doc.data() };
    if (!filterType || data.type === filterType) {
      pantryList.push(data);
    }
    });
    setPantry(pantryList)
  };

  useEffect(() => {
    updatePantry()
  }, [])


  // add item function

  const addItem = async (item, type) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1, type: type })
    } else {
      await setDoc(docRef, { quantity: 1, type: type })
    }
    await updatePantry()
  }

  // remove item function
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updatePantry()
  }


  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={'column'}
      gap={4}
    > 

    <Box>
      <Button variant="contained" color="primary" onClick={() => updatePantry('food')}>
        Show Food
      </Button>

      <Button variant="contained" color="primary" onClick={() => updatePantry('drink')}>
        Show Drinks
      </Button>

      <Button variant="contained" color="primary" onClick={() => updatePantry()}>
        Show All
      </Button>
    </Box>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
          <TextField
            id="outlined-basic"
            label="Item"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
          id="outline-select-currency"
          select
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          helperText="Please select the item type"
          fullWidth
          >
            <MenuItem value="food">Food</MenuItem>
            <MenuItem value="drink">Drink</MenuItem>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              addItem(itemName, type)
              setItemName('')
              handleClose()
            }}
          >
            Add
          </Button>
        </Stack>
        </Box>
      </Modal>
    
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Item
      </Button>

      <Box border={'1px solid #333'} borderRadius="8px" overflow="hidden">

        {/* header */}
        <Box 
          width={'800px'} 
          height={'100px'} 
          bgcolor={'#1976d2'} 
          display={'flex'} 
          justifyContent={"center"} 
          alignItems={'center'}
        >
          <Typography 
            variant="h3"
            color={'#fff'}
            textAlign={'center'}
            textTransform={'capitalize'} 
          >
            Pantry Tracker
          </Typography>
        </Box>

        <Stack width="800px" spacing={2} maxHeight="300px" overflow={"auto"} padding={2}>
          {pantry.map((item, index) => (
            <Box
              key={`${item.name}-${index}`}
              width="100%"
              minHeight="70px"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#e3f2fd'}
              borderRadius="4px"
              paddingX={3}
              paddingY={2}
            >
              <Typography 
                variant="h6"
                color={'#1976d2'}
                textAlign={'center'}
                textTransform={'capitalize'}
                flexGrow={1}
              >
                {item.name}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography 
                  variant="h6"
                  color={'#1976d2'}
                  textAlign={'right'}
                >
                  Quantity: {item.quantity}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    removeItem(item.name);
                    console.log("removing...");
                  }}
                  sx={{ minWidth: '40px', padding: '6px 12px' }}
                >
                  -
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    addItem(item.name, item.type);
                    console.log("adding...");
                  }}
                  sx={{ minWidth: '40px', padding: '6px 12px' }}
                >
                  +
                </Button>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
