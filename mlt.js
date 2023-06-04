// Define your banking transaction data
const transactions = [
    { date: "2022-01-01", location: "New York", destination: "Amazon", amount: 100.0 },
    { date: "2022-01-02", location: "San Francisco", destination: "Apple", amount: 200.0 },
    { date: "2022-01-03", location: "New York", destination: "Microsoft", amount: 50.0 },
    { date: "2022-01-04", location: "Los Angeles", destination: "Google", amount: 150.0 },
    { date: "2022-01-05", location: "Chicago", destination: "Amazon", amount: 75.0 },
    { date: "2022-01-06", location: "Seattle", destination: "Apple", amount: 125.0 },
];

// Define the number of clusters you want to create
const numClusters = 3;

// Convert transactions data into a feature matrix
const featureMatrix = transactions.map((t) => [t.amount]);

// Create a KMeans clustering object with the desired number of clusters
const kmeans = new ml5.KMeans(numClusters);

// Fit the clustering model to the feature matrix
kmeans.fit(featureMatrix);

// Get the cluster assignments for each transaction
const clusterAssignments = kmeans.predict(featureMatrix);

// Print out the cluster assignments for each transaction
console.log(clusterAssignments);