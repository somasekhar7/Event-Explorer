import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PollItem() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState('');
    const [sessionEmail, setSessionEmail] = useState('');
    const [showModal, setShowModal] = useState(true);
    const [hasVoted, setHasVoted] = useState(false); // New state to track if user has voted for selected artist
    const[firstTime, setFirstTime] = useState(true)
    useEffect(() => {
        const email = sessionStorage.getItem("email");
        if (email) {
            setSessionEmail(email);
        }
        fetchCategories();
        // const hasRendered = sessionStorage.getItem("pollItemRendered");
        if (firstTime) {
            setShowModal(true); // Do not show modal if component has been rendered before
            setFirstTime(false);
        } else {
            sessionStorage.setItem("pollItemRendered", "true"); // Set flag in session storage
        }
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/v1/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchArtists = async (categoryId) => {
        try {
            const response = await axios.get(`/v1/artists-by-category/${categoryId}`);
            setArtists(response.data);
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryName = e.target.value;
        setSelectedCategory(selectedCategoryName);
        const categoryId = categories.find(category => category.name === selectedCategoryName)?.id;
        if (categoryId) {
            fetchArtists(categoryId);
        }
    };

    const handleArtistChange = (e) => {
        setSelectedArtist(e.target.value);
    };

    const handleVote = async () => {
        try {
            const response = await axios.get(`/v1/check-vote/${sessionEmail}`);
            console.log('Response from backend:', response.data);

            if (response.data) {
                console.log(`You have already voted for ${selectedArtist}`)
                toast.warning(`You have already voted `);
            } else {
                await axios.post('/v1/poll', {
                    artistName: selectedArtist,
                    email: sessionEmail,
                    categoryId: selectedCategory,
                    votes: 1
                });
                console.log('You have voted for')
                toast.success(`You have voted for ${selectedArtist}.`);
                setShowModal(false);
                setHasVoted(true); // Update hasVoted state to true after successful vote
                sessionStorage.setItem("pollItemRendered", "true");

            }
        } catch (error) {
            console.error('Error submitting vote:', error);
            toast.error("Error submitting vote. Please try again later.");
        }
    };

    return (
        <div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tell Us Your Interest</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Select Category:</Form.Label>
                        <Form.Control as="select" onChange={handleCategoryChange}>
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Select Artist:</Form.Label>
                        <Form.Control as="select" onChange={handleArtistChange}>
                            <option value="">Select Artist</option>
                            {artists.map(artist => (
                                <option key={artist.id} value={artist.name} disabled={hasVoted}>
                                    {artist.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleVote} disabled={!selectedArtist || hasVoted}>
                        Vote
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </div>
    );
}

export default PollItem;
