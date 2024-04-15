const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          device.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res) {
    const { brandId, typeId } = req.query;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll();
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({ where: { brandId } });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { typeId } });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { brandId, typeId } });
    }
    return res.json(devices);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();
