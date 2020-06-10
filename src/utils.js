export const convertData = (data) => {
  const formatedData = [];

  const formatData = (record) => {
    const formatedRecord = {
      name: {
        first: record.name.first,
        last: record.name.last,
      },
      email: record.email,
      city: record.location.city,
      country: record.location.country,
      thumbnail: record.picture.thumbnail,
    };

    formatedData.push(formatedRecord);
  };

  data.forEach(formatData);
  return formatedData;
};
