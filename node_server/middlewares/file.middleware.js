import { FileMetadata } from "../models/File.model";

export const verifyMemoryLimit = async (req, res, next) => {
  const { user } = req.user;

  const pipeline = [
    [
      { $group: { _id: { owner: user }, totalSize: { $sum: "$size" } } },
      { $project: { totalSize: 1, _id: 0 } },
    ],
  ];
  const result = await FileMetadata.aggregate(pipeline);
  if (result) {
    const { totalSize: memoryConsumed } = result[0];
    console.log({ memoryConsumed });
    // if (totalSize > user.memoryLimit) {
    //   return res.status(400).json({ message: "Memory limit exceeded" });
    // }
  }

  next();
};

