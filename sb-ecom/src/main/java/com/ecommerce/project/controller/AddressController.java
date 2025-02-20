package com.ecommerce.project.controller;

import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.AddressDTO;
import com.ecommerce.project.service.AddressService;
import com.ecommerce.project.util.AuthUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AddressController {

    @Autowired
    private AddressService addressService;
    @Autowired
    private AuthUtil authUtil;

    @GetMapping("/addresses")
    public ResponseEntity<List<AddressDTO>> getAllAddressess() {
        List<AddressDTO> allAddresses=addressService.getAllAddresses();
        return new ResponseEntity<>(allAddresses, HttpStatus.OK);
    }

    @GetMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> getAddressById(@PathVariable Long addressId) {
        AddressDTO address=addressService.getAddressById(addressId);
        return new ResponseEntity<>(address, HttpStatus.OK);
    }

    @GetMapping("/users/addresses")
    public ResponseEntity<List<AddressDTO>> getUserAddresses() {
        User user=authUtil.loggedInUser();
        List<AddressDTO> allAddresses=addressService.getUserAddresses(user);
        return new ResponseEntity<>(allAddresses, HttpStatus.OK);
    }

    @PostMapping("/addresses")
    public ResponseEntity<AddressDTO> createAddress(@Valid @RequestBody AddressDTO addressDTO) {
        User user=authUtil.loggedInUser();
        AddressDTO savedAddress=addressService.createAddress(addressDTO,user);
        return new ResponseEntity<>(savedAddress, HttpStatus.CREATED);
    }

    @PutMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> updateAddressById(@PathVariable Long addressId,@Valid @RequestBody AddressDTO addressDTO) {
        AddressDTO updatedaddress=addressService.updateAddressById(addressId,addressDTO);
        return new ResponseEntity<>(updatedaddress, HttpStatus.OK);
    }

    @DeleteMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> deleteAddressById(@PathVariable Long addressId) {
        AddressDTO deletedaddress=addressService.deleteAddressById(addressId);
        return new ResponseEntity<>(deletedaddress, HttpStatus.OK);
    }

}
