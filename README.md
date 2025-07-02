# 🖼️ Smart Image Uploader & Gallery

A modern, cloud-powered image management application that automatically resizes uploaded images using AWS services. Built with React, TypeScript, and AWS Amplify.

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![AWS](https://img.shields.io/badge/AWS-Amplify-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

This application provides a seamless image upload experience with automatic server-side resizing. Users can upload images through an elegant web interface, and the system automatically processes and optimizes them for web display using AWS Lambda and the Sharp image processing library.




## Features

### **Modern UI/UX**
- **Glass Morphism Design**: Beautiful frosted glass effects with backdrop blur
- **Gradient Backgrounds**: Animated gradient backgrounds with floating particles
- **Smooth Animations**: Hover effects, transitions, and loading animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Professional Typography**: Modern Inter font with gradient text effects

### **Core Functionality**
- **Drag & Drop Upload**: Intuitive file upload with styled upload button
- **Automatic Image Resizing**: Server-side processing to 900px width while maintaining aspect ratio
- **Real-time Gallery**: Dynamic display of all uploaded images
- **Progress Indicators**: Visual feedback during upload and processing
- **Error Handling**: Robust error management with user-friendly messages

### **Performance & Optimization**
- **Serverless Architecture**: AWS Lambda for scalable image processing
- **CDN Integration**: Fast image delivery through AWS S3
- **Optimized Loading**: Lazy loading and efficient image rendering
- **TypeScript**: Type-safe development with enhanced IDE support


## Architecture

### **Frontend (React + TypeScript)**
```
┌─────────────────────────────────────┐
│           React Frontend            │
│  ┌─────────────┐ ┌─────────────────┐│
│  │   Upload    │ │     Gallery     ││
│  │ Component   │ │   Component     ││
│  └─────────────┘ └─────────────────┘│
│           AWS Amplify SDK           │
└─────────────────────────────────────┘
                    │
                    ▼
```

### **Backend (AWS Services)**
```
┌─────────────────────────────────────┐
│            AWS S3 Bucket            │
│         (Image Storage)             │
└─────────────┬───────────────────────┘
              │ Trigger
              ▼
┌─────────────────────────────────────┐
│          AWS Lambda                 │
│     (Image Processing)              │
│  ┌─────────────────────────────────┐│
│  │        Sharp Library            ││
│  │    (Resize to 900px width)      ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│         Processed Image             │
│      (Saved back to S3)             │
└─────────────────────────────────────┘
```

### **Authentication & Access**
```
┌─────────────────────────────────────┐
│        Amazon Cognito               │
│      (Identity Pool)                │
│   ┌─────────────────────────────┐   │
│   │    Unauthenticated Role     │   │
│   │   (Public S3 Access)        │   │
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
```


## Technology Stack

### **Frontend**
- **React 18.x**: Modern React with hooks and functional components
- **TypeScript 5.x**: Type-safe JavaScript with enhanced developer experience
- **AWS Amplify UI**: Pre-built UI components for AWS integration
- **CSS3**: Modern styling with animations, gradients, and glass morphism
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

### **Backend & Cloud Services**
- **AWS S3**: Scalable object storage for images
- **AWS Lambda**: Serverless compute for image processing
- **AWS Cognito**: Identity and access management
- **AWS Amplify**: Full-stack development platform
- **Sharp Library**: High-performance image processing in Node.js

### **Development Tools**
- **Node.js 20.x**: JavaScript runtime environment
- **npm**: Package management
- **Docker**: Containerization for Lambda deployment
- **Git**: Version control system


## Prerequisites

Before setting up this project, ensure you have the following installed and configured:

### **Required Software**
- **Node.js** (version 16.x or later)
- **npm** (version 8.x or later)
- **Git** (for version control)
- **Docker Desktop** (for Lambda function deployment)

### **AWS Account Setup**
- **AWS Account** with appropriate permissions
- **AWS CLI** installed and configured
- **AWS Amplify CLI** installed globally

### **AWS Services Configuration**
- **S3 Bucket** for image storage
- **Lambda Function** for image processing
- **Cognito Identity Pool** for authentication
- **IAM Roles** with proper permissions

## Installation & Setup

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd smart-image-uploader
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure AWS Amplify**
```bash
# Install Amplify CLI globally
npm install -g @aws-amplify/cli

# Configure Amplify with your AWS credentials
amplify configure
```

### **4. Initialize Amplify Project**
```bash
# Initialize the Amplify project
amplify init

# Add storage (S3) to your project
amplify add storage

# Add function (Lambda) for image processing
amplify add function

# Deploy the backend
amplify push
```


### **5. Lambda Function Setup**

The Lambda function handles automatic image resizing using the Sharp library. Due to platform compatibility requirements, the function must be built in a Linux environment.

#### **Option A: Using Docker (Recommended)**
```bash
# Navigate to your project directory
cd /path/to/your/project

# Build the Lambda package using Docker
docker run --platform linux/amd64 --rm --entrypoint /bin/bash \
  -v "%cd%":/var/task public.ecr.aws/lambda/nodejs:20 \
  -c "npm install @aws-sdk/client-s3 && exit"

# Create deployment package
zip -r image-resizer-v3.zip . -x "*.git*" "*DS_Store*"
```

#### **Option B: Manual Setup**
1. Download the pre-built package from the tutorial repository
2. Modify the `index.mjs` file with your custom logic
3. Upload the ZIP file to your Lambda function

#### **Lambda Function Configuration**
- **Runtime**: Node.js 20.x or 22.x
- **Handler**: `index.mjs`
- **Memory**: 512 MB (recommended)
- **Timeout**: 15 seconds
- **Environment Variables**: None required

### **6. S3 Bucket Configuration**

#### **Bucket Policy for Public Access**
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/public/*"
        }
    ]
}
```

#### **S3 Event Trigger**
Configure your S3 bucket to trigger the Lambda function on object creation events in the `public/` folder.


### **7. Frontend Configuration**

Update your `aws-exports.js` file with the correct AWS configuration:

```javascript
const awsmobile = {
    "aws_project_region": "your-region",
    "aws_cognito_identity_pool_id": "your-identity-pool-id",
    "aws_cognito_region": "your-region",
    "aws_user_files_s3_bucket": "your-bucket-name",
    "aws_user_files_s3_bucket_region": "your-region"
};
```

### **8. Start the Development Server**
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

### **Uploading Images**
1. **Access the Application**: Open your browser and navigate to the application URL
2. **Select an Image**: Click the "Choose File" button and select an image from your device
3. **Upload Process**: The image will be uploaded to S3 and automatically processed
4. **View Results**: The resized image will appear in the gallery below

### **Image Processing Details**
- **Target Width**: Images are resized to 900 pixels width
- **Aspect Ratio**: Original aspect ratio is maintained
- **Supported Formats**: JPEG, PNG, WebP, TIFF, GIF
- **Processing Time**: Typically 2-5 seconds depending on image size
- **Quality**: High-quality output with metadata preservation

### **Gallery Features**
- **Responsive Grid**: Images are displayed in a responsive grid layout
- **Pagination**: Gallery supports pagination for large image collections
- **Hover Effects**: Interactive hover effects with image scaling
- **Mobile Optimization**: Touch-friendly interface for mobile devices

## Configuration

### **Environment Variables**
The application uses AWS Amplify configuration files. No additional environment variables are required.

### **Customization Options**

#### **Image Resize Dimensions**
To change the target width from 900px, modify the Lambda function:

```javascript
// In your Lambda function (index.mjs)
const resizedImageBuffer = await sharp(imageBuffer)
  .resize({ width: 1200 }) // Change this value
  .withMetadata()
  .toBuffer();
```

#### **Supported File Types**
Modify the supported file types in the Lambda function:

```javascript
const supportedTypes = ['jpg', 'jpeg', 'png', 'webp', 'tiff', 'gif'];
```

#### **UI Customization**
The application's appearance can be customized by modifying the CSS variables in `App.css`:

```css
/* Custom color scheme */
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --accent-color: #ff6b6b;
  --glass-background: rgba(255, 255, 255, 0.1);
}
```


## Project Structure

```
smart-image-uploader/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   ├── App.tsx              # Main application component
│   ├── App.css              # Styling and animations
│   ├── index.tsx            # Application entry point
│   └── aws-exports.js       # AWS configuration
├── amplify/
│   ├── backend/
│   │   ├── function/
│   │   │   └── imageResizer/
│   │   │       └── src/
│   │   │           └── index.mjs    # Lambda function code
│   │   └── storage/
│   └── team-provider-info.json
├── package.json
├── tsconfig.json
└── README.md
```

## Troubleshooting

### **Common Issues**

#### **TypeScript Errors**
```bash
# Error: Property 'results' does not exist
# Solution: Ensure proper typing for Storage.list response
const fileData: StorageListItem[] = await Storage.list('public/', { level: 'public' });
```

#### **Lambda Function Errors**
```bash
# Error: Cannot find module 'aws-sdk'
# Solution: Use Node.js 16.x runtime or include AWS SDK v3
```

#### **Image Upload Failures**
```bash
# Error: Access Denied
# Solution: Check S3 bucket policy and Cognito permissions
```

#### **Images Not Resizing**
```bash
# Check Lambda function logs in CloudWatch
# Verify S3 trigger configuration
# Ensure Sharp library is properly compiled for Linux
```

### **Debug Steps**

1. **Check AWS Configuration**
   ```bash
   # Verify AWS credentials
   aws sts get-caller-identity
   
   # Check Amplify status
   amplify status
   ```

2. **Monitor Lambda Execution**
   - Open AWS CloudWatch Logs
   - Check Lambda function execution logs
   - Look for error messages or timeout issues

3. **Verify S3 Permissions**
   - Check bucket policy for public read access
   - Verify Cognito identity pool permissions
   - Test direct S3 upload via AWS Console

4. **Frontend Debugging**
   ```bash
   # Check browser console for errors
   # Verify network requests in Developer Tools
   # Test with different image formats and sizes
   ```


## Deployment

### **Frontend Deployment**

#### **AWS Amplify Hosting**
```bash
# Add hosting to your Amplify project
amplify add hosting

# Choose "Amazon CloudFront and S3"
# Deploy your application
amplify publish
```

#### **Alternative Deployment Options**
- **Netlify**: Connect your Git repository for automatic deployments
- **Vercel**: Deploy with zero configuration
- **AWS S3 + CloudFront**: Manual static site hosting

### **Backend Deployment**
The backend is automatically deployed when you run:
```bash
amplify push
```

This deploys:
- S3 bucket with proper configuration
- Lambda function with triggers
- Cognito identity pool
- IAM roles and policies

## Performance Considerations

### **Image Processing**
- **Lambda Memory**: Increase to 512MB+ for faster processing
- **Timeout Settings**: Set to 15 seconds for large images
- **Concurrent Executions**: AWS Lambda automatically scales

### **Frontend Optimization**
- **Image Lazy Loading**: Implemented for gallery performance
- **Responsive Images**: Optimized for different screen sizes
- **Caching**: Browser caching for static assets

### **Cost Optimization**
- **S3 Storage Classes**: Use Intelligent Tiering for cost savings
- **Lambda Provisioned Concurrency**: Only if needed for consistent performance
- **CloudFront CDN**: Reduces S3 request costs

## Contributing

We welcome contributions to improve this project! Here's how you can help:

### **Getting Started**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Maintain responsive design principles
- Add appropriate error handling
- Update documentation for new features
- Test on multiple devices and browsers

### **Areas for Contribution**
- **UI/UX Improvements**: Enhanced animations and interactions
- **Performance Optimization**: Faster image processing and loading
- **Feature Additions**: Batch upload, image filters, metadata editing
- **Testing**: Unit tests and integration tests
- **Documentation**: Tutorials and API documentation


## Future Enhancements

### **Planned Features**
- **Batch Upload**: Multiple file selection and processing
- **Image Filters**: Apply filters and effects before upload
- **User Authentication**: Personal galleries with user accounts
- **Image Metadata**: EXIF data display and editing
- **Download Options**: Multiple format and size downloads
- **Admin Dashboard**: Usage analytics and management tools

### **Technical Improvements**
- **Progressive Web App**: Offline functionality and app-like experience
- **WebP Conversion**: Automatic format optimization
- **Image Compression**: Advanced compression algorithms
- **Real-time Processing**: WebSocket updates for processing status
- **CDN Integration**: Global content delivery optimization

## Security

### **Data Protection**
- **Encryption**: All data encrypted in transit and at rest
- **Access Control**: IAM-based permissions and Cognito authentication
- **Input Validation**: File type and size validation
- **CORS Configuration**: Proper cross-origin resource sharing setup

### **Best Practices**
- Regular security audits of AWS configurations
- Principle of least privilege for IAM roles
- Monitoring and logging of all activities
- Regular updates of dependencies and runtime versions

## Resources

### **Documentation**
- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [React Documentation](https://reactjs.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Sharp Image Processing](https://sharp.pixelplumbing.com/)

### **Tutorials**
- [AWS Lambda with Sharp](https://aws.amazon.com/blogs/compute/resize-images-on-the-fly-with-amazon-s3-aws-lambda-and-amazon-api-gateway/)
- [React with AWS Amplify](https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify-graphql/)
- [TypeScript Best Practices](https://typescript-eslint.io/docs/)


## Acknowledgments

- **AWS Team**: For providing excellent cloud services and documentation
- **Sharp Contributors**: For the high-performance image processing library
- **React Community**: For the robust frontend framework
- **Open Source Community**: For inspiration and best practices

## Support

If you encounter any issues or have questions:

1. **Check the Troubleshooting section** above
2. **Search existing issues** in the repository
3. **Create a new issue** with detailed information
4. **Join our community discussions** for help and tips

---

**Built using React, TypeScript, and AWS**

*Happy coding! *

