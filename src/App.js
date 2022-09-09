import {useState} from "react"

import { Pets, NavBar, Footer, AddPet, PetDetails} from './ui-components';
 import {withAuthenticator} from '@aws-amplify/ui-react'
 import { Storage } from "@aws-amplify/storage"


const App = ({ user, signOut}) => {

  const saveFile = async () => {
    await Storage.put('test.txt', 'Protected Content');
  }
  const [showForm, setShowForm] = useState(false)
  const [showDetailsForm, setShowDetailsForm] = useState(false)
  const [pet, setPet] = useState()
  const [updatePet, setUpdatePet] = useState()

  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [breed, setBreed] = useState("")
  const [about, setAbout] = useState("")
  const [color, setColor] = useState("")
  const [image, setImage] = useState("")

  const addPetOverrides = {
    Icon: {
      onClick: () => {
        setShowForm(false)
      }
    },
    TextField29766922: {
      placeholder: name,
    },
    TextField29766923: {
      placeholder: age
    },
    TextField29766924: {
      placeholder: breed
    },
    TextField34572680: {
      placeholder: about
    },
    TextField34572687: {
      placeholder: color
    },
    TextField34572694: {
      placeholder: image
    },
    image: {
      src:
        updatePet == null
        ? "https://source.unsplash.com/random/700x500/?animal"
        : updatePet.image
    },

    UpdateButton: {
      isDisabled: !updatePet ? true : false
    },
    SaveButton: {
      isDisabled: updatePet ? true : false
    }

  }

 const navbarOverrides = {
  LogOutButton: {
    onClick: signOut,
  },
  image: {
    src: user?.attributes.profile
  },
  username: {
    children: user?.attributes.name
  },
  "Add Pet": {
    style: {
      cursor: 'pointer'
    },
    onClick: () => {
      saveFile()
      setShowForm(!showForm)
    }
  }
 }

  return (
    <>
   
    <NavBar overrides={navbarOverrides}/>
      { showDetailsForm &&
      <PetDetails 
        pet={pet}
        style={{
          textAlign:"left",
          margin: "1rem"
        }}
        overrides={{
          MyIcon: {
            onClick: () => {
              setShowDetailsForm(false)
            },
            style: {
              cursor: "pointer"
            }
          }
        }}
      />
    }

      { showForm &&
      <AddPet 
        pet={updatePet}
        overrides={addPetOverrides}
      />
      }
      <Pets 
        overrideItems={ ({item, index}) => ({
          overrides: {
            Button29766907: {
              onClick: () => {
                setShowDetailsForm(!showDetailsForm)
                setPet(item)
              }
            },
            Button34532729: {
              onClick: () => {
                if (!showForm) setShowForm(true)
                setUpdatePet(item)
                setName(item.name)
                setAge(item.age)
                setBreed(item.breed)
                setColor(item.color)
                setAbout(item.about)
                setImage(item.image)
              }
            }
          }
        })}
      />
      <Footer width={"100%"}/>
   
    </>
  );
}
export default withAuthenticator(App)