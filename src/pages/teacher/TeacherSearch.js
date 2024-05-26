import React, { useState } from 'react';

const TeacherSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = () => {
        // Implement your search logic here, e.g., send searchQuery to backend or filter data
        console.log("Searching for:", searchQuery);
    };

    return (
        <div style={styles.container}>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Дипломын баримт бичиг хайна уу"
                    style={styles.input}
                />
                <button onClick={handleSearchSubmit} style={styles.button}>Хайх</button>
            </div>
            {/* Display search results here */}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    inputContainer: {
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        marginRight: '10px',
        width: 'calc(100% - 120px)', 
    },
    button: {
        padding: '10px 20px',
        background: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
};

export default TeacherSearch;
