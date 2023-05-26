const { faker } = require("@faker-js/faker");

const createFakeJobs = (amount) => {
  const jobs = [];

  for (let i = 0; i < amount; i++) {
    const startYear = faker.number.int({ min: 2000, max: 2021 });
    const job = {
      title: faker.person.jobTitle(),
      location: faker.location.city(),
      description: faker.lorem.lines({ min: 1, max: 2 }),
      startYear: startYear,
      endYear: startYear + faker.number.int({ min: 1, max: 10 }),
      reference: faker.internet.email(),
      link: faker.internet.url(),
    };
    jobs.push(job);
  }
  return jobs;
};

const createFakeEducation = (amount) => {
  const education = [];

  for (let i = 0; i < amount; i++) {
    const startYear = faker.number.int({ min: 1990, max: 2010 });
    const schooling = {
      degree: faker.person.jobTitle(),
      startYear: startYear,
      endYear: startYear + faker.number.int({ min: 1, max: 10 }),
      school: `University of ${faker.location.city()}`,
    };
    education.push(schooling);
  }
  return education;
};

const createFakeSkills = (amount) => {
  const skills = [];

  for (let i = 0; i < amount; i++) {
    const skill = {
      title: faker.hacker.adjective(),
      level: faker.number.int({ min: 1, max: 10 }),
    };
    skills.push(skill);
  }
  return skills;
};

const createFakeApplicants = (amount) => {
  const applicants = [];
  for (let i = 0; i < amount; i++) {
    const applicant = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 99 }),
      job: faker.person.jobTitle(),
      image: faker.image.avatar(),
      jobs: createFakeJobs(faker.number.int({ min: 2, max: 5 })),
      education: createFakeEducation(faker.number.int({ min: 2, max: 5 })),
      skills: createFakeSkills(faker.number.int({ min: 2, max: 5 })),
    };
    applicants.push(applicant);
  }
  return applicants;
};

module.exports = { createFakeApplicants };
