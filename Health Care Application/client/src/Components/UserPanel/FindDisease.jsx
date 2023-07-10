import React, { useState, useEffect } from 'react';
import { PickList } from 'primereact/picklist';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
const FindDisease = () => {
    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);
    const [disease, setDisease] = useState('')
    const [basicModal, setBasicModal] = useState(false);

    const onChange = (event) => {
        setSource(event.source);
        setTarget(event.target);
        console.log("Target", target)
    };


    const toggleShow = () => setBasicModal(!basicModal);

    const GetSymptom = async () => {
        try {
            const response = await fetch('/getsymptom', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(response.error);
            }

            const symptoms = await response.json();
            setSource(symptoms);
        } catch (error) {
            console.log(error);
        }
    };

    const GetDisease = async (e) => {
        try {
            // e.preventDefault();
            const response = await fetch('/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(target)
            })
            const data = await response.json()
            if (response.status === 200) {
                console.log("Success")
                setDisease(data)
                toggleShow()

            }
            else if (response.status === 401) {
                window.alert("Enter 4 symptom")
                console.log("Enter 4 symptom")
            }
            else if (response.status === 402) {
                window.alert("Enter at least 1 symptom")
                console.log("Enter at least 1 symptom")
            }
            else {
                window.alert("Something went wrong")
                console.log("Enter at least 1 symptom")
            }
        }
        catch (error) {
            console.log("Is this an error ?", Error)
        }
    }

    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <div className="flex-1 flex flex-column gap-2">
                    <span className="font-bold">{item}</span>
                </div>
            </div>
        );
    };

    useEffect(() => {
        GetSymptom();
    }, []);

    return (
        <>
            <div className="card m-5 w-75 mx-auto">
                <PickList
                    source={source}
                    target={target}
                    onChange={onChange}
                    itemTemplate={itemTemplate}
                    filter
                    filterBy="name"
                    breakpoint="1400px"
                    sourceHeader="Available"
                    targetHeader="Selected"
                    sourceStyle={{ height: '30rem' }}
                    targetStyle={{ height: '30rem' }}
                    sourceFilterPlaceholder="Search by name"
                    targetFilterPlaceholder="Search by name"
                    className="m-3"
                />
            </div>
            s
            <MDBBtn onClick={() => { GetDisease() }}>Submit</MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Possible Disease</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            You are suffering {disease}
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>

    );
};

export default FindDisease;
