
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('conditions').del()
    .then(function () {
      // Inserts seed entries
      return knex('conditions').insert([
        {id: 1, name: 'Adrenocortical Carcinoma', specialties_id: 1},
        {id: 2, name: 'Bladder Cancer', specialties_id: 1},
        {id: 3, name: 'Bone Cancer', specialties_id: 1},
        {id: 4, name: 'Brain Tumors', specialties_id: 1},
        {id: 5, name: 'Breast Cancer', specialties_id: 1},
        {id: 6, name: 'Cervical Cancer', specialties_id: 1},
        {id: 7, name: 'Colon and Rectal Cancer', specialties_id: 1},
        {id: 8, name: 'Endometrial Cancer', specialties_id: 1},
        {id: 9, name: 'Esophageal Cancer', specialties_id: 1},
        {id: 10, name: 'Gastrointestinal Stromal Tumors', specialties_id: 1},
        {id: 11, name: 'Head and Neck Cancer', specialties_id: 1},
        {id: 12, name: 'Hodgkin Lymphoma', specialties_id: 1},
        {id: 13, name: 'Kaposi Carcoma', specialties_id: 1},
        {id: 14, name: 'Kidney (Rena Cell) Cancer', specialties_id: 1},
        {id: 15, name: 'Leukemia', specialties_id: 1},
        {id: 16, name: 'Liver Cancer', specialties_id: 1},
        {id: 17, name: 'Lung Cancer', specialties_id: 1},
        {id: 18, name: 'Malignant Mesothelioma', specialties_id: 1},
        {id: 19, name: 'Melanoma', specialties_id: 1},
        {id: 20, name: 'Multicentric Castleman Disease', specialties_id: 1},
        {id: 21, name: 'Multiple Myeloma and Other Plasma Cell Neoplasms', specialties_id: 1},
        {id: 22, name: 'Myeloproliferative Neoplasms', specialties_id: 1},
        {id: 23, name: 'Neuroblastoma', specialties_id: 1},
        {id: 24, name: 'Non-Hodgkin Lymphoma', specialties_id: 1},
        {id: 25, name: 'Ovarian, Fallopian Tube, or Primary Peritoneal Cancer', specialties_id: 1},
        {id: 26, name: 'Pancreatic Cancer', specialties_id: 1},
        {id: 27, name: 'Penile Cancer', specialties_id: 1},
        {id: 28, name: 'Pheochromocytoma and Paraganglioma', specialties_id: 1},
        {id: 29, name: 'Prostate Cancer', specialties_id: 1},
        {id: 30, name: 'Retinoblastoma', specialties_id: 1},
        {id: 31, name: 'Rhabdomyosarcoma', specialties_id: 1},
        {id: 32, name: 'Skin Cancer', specialties_id: 1},
        {id: 33, name: 'Soft Tissue Sarcoma', specialties_id: 1},
        {id: 34, name: 'Stomach (Gastric) Cancer', specialties_id: 1},
        {id: 35, name: 'Testicular Cancer', specialties_id: 1},
        {id: 36, name: 'Thyroid Cancer', specialties_id: 1},
        {id: 37, name: 'Vaginal Cancer', specialties_id: 1},
        {id: 38, name: 'Vulvar Cancer', specialties_id: 1},
        {id: 39, name: 'Wilms Tumor and other Childhood Kidney Cancers', specialties_id: 1}

      ])
    })
    .then(function () {
      //Moves id column (PK) auto-incremented to correct value after inserts
      return knex.raw(`SELECT setval('conditions_id_seq', (SELECT MAX(id) FROM conditions))`)
    })
}
