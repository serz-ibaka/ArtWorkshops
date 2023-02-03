import mongoose from "mongoose";

var User = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  organization: {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    number: {
      type: String,
    },
  },
  status: {
    type: String,
  },
  type: {
    type: String,
  },
  participantWorkshops: [
    {
      name: {
        type: String,
      },
      place: {
        type: String,
      },
      datetime: {
        type: Date,
      },
      status: {
        type: String,
      },
    },
  ],
  organizerWorkshops: [
    {
      name: {
        type: String,
      },
      place: {
        type: String,
      },
      datetime: {
        type: Date,
      },
      status: {
        type: String,
      },
    },
  ],
  comments: [
    {
      content: {
        type: String,
      },
      datetime: {
        type: Date,
      },
      workshopName: {
        type: String,
      },
    },
  ],
  likes: [
    {
      datetime: {
        type: Date,
      },
      workshopName: {
        type: String,
      },
    },
  ],
  messages: [
    {
      username: {
        type: String,
      },
      image_path: {
        type: String,
      },
      messages: [
        {
          content: {
            type: String,
          },
          datetime: {
            type: Date,
          },
          direction: {
            type: String,
          },
        },
      ],
    },
  ],
});

export default mongoose.model("User", User, "users");
