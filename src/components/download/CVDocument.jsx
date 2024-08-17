import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { CopyAll, LinkedIn, GitHub, Home, Phone } from "@mui/icons-material";
import { fetchCandidateCV } from "../../service/adminService";
import { formatDate } from "../../utils/formatData";

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
    display: "flex",
    flexDirection: "row",
  },
  leftSection: {
    width: "35%",
    backgroundColor: "#e0f7fa",
    padding: 20,
    color: "#333",
  },
  rightSection: {
    width: "65%",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
    fontWeight: "bold",
  },
  text: {
    marginBottom: 5,
    color: "#333",
  },
  link: {
    color: "blue",
    textDecoration: "none",
  },
  gradient: {
    backgroundColor: "#00bfa5",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    color: "#fff",
  },
  skills: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
  },
  skillItem: {
    marginBottom: 5,
    color: "#d32f2f", // Red color for the skill levels
  },
  section: {
    marginBottom: 15,
  },
  listItem: {
    marginBottom: 5,
  },
  position: {
    color: "#e91e63", // Pink color for job titles
    fontSize: 16,
    fontWeight: "bold",
  },
  companyName: {
    color: "#2e7d32", // Green color for company names
    fontSize: 14,
    fontWeight: "bold",
  },
  projectTitle: {
    color: "#0288d1", // Blue color for project titles
    fontSize: 14,
    fontWeight: "bold",
  },
  certificateName: {
    color: "#ff9800", // Orange color for certificate names
    fontSize: 14,
    fontWeight: "bold",
  },
});

const CVDocument = ({ profile }) => {
  const [imageData, setImageData] = useState(null);

 

  useEffect(() => {
    const loadImage = async () => {
      if (profile?.avatar) {
        try {
          const response = await fetch(profile.avatar);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            setImageData(reader.result);
          };
        } catch (error) {
          console.error("Failed to load image", error);
        }
      }
    };
    loadImage();
  }, [profile?.avatar]);

  if (!profile) {
    return <Text>Loading...</Text>;
  }

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.leftSection}>
          {profile.avatar && (
            <Image style={styles.profileImage} src={imageData} />
          )}
          <Text style={styles.header}>{profile.name}</Text>
          <Text style={styles.text}>Age: {profile.age}</Text>
          <Text style={styles.text}>
            Gender: {profile.gender ? "Male" : "Female"}
          </Text>
          <Text style={styles.text}>Address: {profile.address}</Text>
          <Text style={styles.text}>Phone: {profile.phone}</Text>
          {profile.linkLinkedin && (
            <Text style={styles.text}>
              LinkedIn:{" "}
              <Text style={styles.link}>{profile.linkLinkedin}</Text>
            </Text>
          )}
          {profile.linkGit && (
            <Text style={styles.text}>
              GitHub: <Text style={styles.link}>{profile.linkGit}</Text>
            </Text>
          )}
          <View style={styles.skills}>
            <Text style={styles.subHeader}>Skills</Text>
            {profile.skills?.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>
                {skill.name} - {skill.level}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.rightSection}>
          {profile.about && (
            <View style={styles.section}>
              <Text style={styles.subHeader}>About</Text>
              <Text style={styles.text}>{profile.about}</Text>
            </View>
          )}

          {profile.experiences && (
            <View style={styles.section}>
              <Text style={styles.subHeader}>Experience</Text>
              {profile.experiences.map((exp, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.position}>
                    {exp.position}{" "}
                    <Text style={styles.companyName}>at {exp.company}</Text>
                  </Text>
                  <Text style={styles.text}>
                  {formatDate(exp.startAt)} - {formatDate(exp.endAt)}                  </Text>
                  <Text style={styles.text}>{exp.info}</Text>
                </View>
              ))}
            </View>
          )}

          {profile.projects && (
            <View style={styles.section}>
              <Text style={styles.subHeader}>Projects</Text>
              {profile.projects.map((proj, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.projectTitle}>{proj.name}</Text>
                  <Text style={styles.text}>
                    {formatDate(proj.startAt)} - {formatDate(proj.endAt)}
                  </Text>
                  <Text style={styles.text}>Info: {proj.info}</Text>
                  {proj.link && (
                    <Text style={styles.text}>
                      Link: <Text style={styles.link}>{proj.link}</Text>
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {profile.educations && (
            <View style={styles.section}>
              <Text style={styles.subHeader}>Education</Text>
              {profile.educations.map((edu, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.text}>
                    <Text style={styles.subHeader}>{edu.nameEducation}</Text> (
                    {edu.major})
                  </Text>
                  <Text style={styles.text}>
                    {formatDate(edu.startAt)} - {formatDate(edu.endAt)}
                  </Text>
                  <Text style={styles.text}>{edu.info}</Text>
                </View>
              ))}
            </View>
          )}

          {profile.certificates && (
            <View style={styles.section}>
              <Text style={styles.subHeader}>Certificates</Text>
              {profile.certificates.map((cert, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.certificateName}>{cert.name}</Text>{" "}
                  <Text style={styles.text}>({cert.organization})</Text>
                  <Text style={styles.text}>
                    {formatDate(cert.startAt)} - {formatDate(cert.endAt)}
                  </Text>
                  <Text style={styles.text}>{cert.info}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default CVDocument;
