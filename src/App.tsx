import React, { useState, useEffect } from 'react';
import { Card, Collection, Divider, Flex, Heading, Image, Button, Loader } from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';
import './App.css';

interface IImageCard {
  key: string;
  imageUrl: string;
}

// Define a type for the expected output of Storage.list
interface StorageListItem {
  key: string;
  eTag?: string;
  lastModified?: string;
  size?: number;
}

function App() {
  const [images, setImages] = useState<IImageCard[]>([]);
  const [uploading, setUploading] = useState(false);

  // Fetch images from S3 when the component loads and after uploads
  const fetchImages = async () => {
    try {
      // List all items in the public folder
      const fileData = await Storage.list('public/', { level: 'public' });
      // Filter out items with undefined key and common S3 folder objects (keys ending with /) and get signed URLs
      const validFiles = fileData.filter((file: { key?: string }) => file.key && !file.key.endsWith('/'));
      const mappedImages = await Promise.all(
        validFiles.map(async (file: { key?: string }) => {
          // file.key is guaranteed to be defined here due to the filter above
          const signedURL = await Storage.get(file.key as string, { level: 'public' });
          return { key: file.key as string, imageUrl: signedURL as string };
        })
      );
      setImages(mappedImages);
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileName = file.name;
      const key = `public/${fileName}`;

      await Storage.put(key, file, {
        contentType: file.type,
        level: 'public',
      });

      // After upload, refresh the image list
      await fetchImages();
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
      // Clear the input field after upload
      if (event.target) {
        event.target.value = '';
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Heading fontWeight="bold" color="font.primary" level={1}>Image Uploader & Gallery</Heading>
        <p>Upload an image. The backend will automatically resize it.</p>
        <div className="uploader">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            style={{ display: 'none' }} // Hide the default input
            id="file-upload"
          />
          <label htmlFor="file-upload" className="upload-button">
            {uploading ? <Loader variation="linear" /> : 'Choose File'}
          </label>
          {uploading && <p>Uploading...</p>}
        </div>
      </header>
      <main>
        <Divider orientation="horizontal" color="blue" />
        <Heading fontWeight="bold" color="font.primary" level={2}>Image Gallery</Heading>
        <Flex
          width="100vw"
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          alignContent="center"
          gap="1rem"
        >
          <Collection
            width={"90vw"}
            type="list"
            direction="row"
            wrap="wrap"
            items={images}
            isPaginated
            itemsPerPage={8}
          >
            {(image) => (
              <Card color={"whitesmoke"} maxWidth="20vw" width="27%" backgroundColor="grey" padding="0"
                    variation="outlined" key={image.key}>
                <Flex direction="row" alignItems="flex-start">
                  <Image
                    objectFit="cover"
                    alt={image.key}
                    src={image.imageUrl}
                    height="35rem"
                    width={"100%"}
                  />
                </Flex>
              </Card>
            )}
          </Collection>
        </Flex>
      </main>
    </div>
  );
}

export default App;


